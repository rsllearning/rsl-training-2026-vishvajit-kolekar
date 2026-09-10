package com.example.subscriptionpricing;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

@DisplayName("Subscription pricing service")
class SubscriptionPricingServiceTest {

    private SubscriptionPricingService service;

    @BeforeEach
    void setUp() {
        service = new SubscriptionPricingService();
    }

    @Nested
    @DisplayName("Base tier pricing tests")
    class BaseTierPricingTests {

        @ParameterizedTest(name = "{0} at {1} months costs ${3}")
        @CsvSource({
                "BASIC, 0, , 50.00",
                "BASIC, 1, , 50.00",
                "BASIC, 12, , 50.00",
                "PRO, 0, , 150.00",
                "PRO, 1, , 150.00",
                "PRO, 12, , 150.00",
                "ENTERPRISE, 0, , 500.00",
                "ENTERPRISE, 1, , 500.00",
                "ENTERPRISE, 12, , 500.00"
        })
        @DisplayName("Returns the correct base rate without a longevity discount")
        void returnsBaseRateWithoutDiscount(String tier, int activeMonths, String voucherCode,
                String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate(tier, activeMonths, voucherCode);

            assertEquals(new BigDecimal(expectedRate), result);
        }
    }

    @Nested
    @DisplayName("Longevity discount tests")
    class LongevityDiscountTests {

        @ParameterizedTest(name = "{0} at {1} months costs ${3}")
        @CsvSource({
                "BASIC, 13, , 45.00",
                "BASIC, 24, , 45.00",
                "BASIC, 36, , 45.00",
                "PRO, 13, , 135.00",
                "PRO, 24, , 135.00",
                "PRO, 36, , 135.00",
                "ENTERPRISE, 13, , 450.00",
                "ENTERPRISE, 24, , 450.00",
                "ENTERPRISE, 36, , 450.00"
        })
        @DisplayName("Applies the ten percent discount only after twelve months")
        void appliesTenPercentDiscountAfterTwelveMonths(String tier, int activeMonths,
                String voucherCode, String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate(tier, activeMonths, voucherCode);

            assertEquals(new BigDecimal(expectedRate), result);
        }

        @ParameterizedTest(name = "{0} at {1} months costs ${3}")
        @CsvSource({
                "BASIC, 37, , 37.50",
                "BASIC, 48, , 37.50",
                "BASIC, 60, , 37.50",
                "PRO, 37, , 112.50",
                "PRO, 48, , 112.50",
                "PRO, 60, , 112.50",
                "ENTERPRISE, 37, , 375.00",
                "ENTERPRISE, 48, , 375.00",
                "ENTERPRISE, 60, , 375.00"
        })
        @DisplayName("Applies the twenty-five percent discount after thirty-six months")
        void appliesTwentyFivePercentDiscountAfterThirtySixMonths(String tier, int activeMonths,
                String voucherCode, String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate(tier, activeMonths, voucherCode);

            assertEquals(new BigDecimal(expectedRate), result);
        }
    }

    @Nested
    @DisplayName("Voucher code tests")
    class VoucherCodeTests {

        @ParameterizedTest(name = "{0} at {1} months with SAVE20 costs ${3}")
        @CsvSource({
                "BASIC, 0, SAVE20, 30.00",
                "PRO, 0, SAVE20, 130.00",
                "ENTERPRISE, 0, SAVE20, 480.00",
                "BASIC, 13, SAVE20, 25.00",
                "PRO, 13, SAVE20, 115.00",
                "ENTERPRISE, 13, SAVE20, 430.00",
                "BASIC, 37, SAVE20, 17.50",
                "PRO, 37, SAVE20, 92.50",
                "ENTERPRISE, 37, SAVE20, 355.00"
        })
        @DisplayName("Applies SAVE20 after longevity discounts")
        void appliesSaveTwentyAfterLongevityDiscount(String tier, int activeMonths,
                String voucherCode, String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate(tier, activeMonths, voucherCode);

            assertEquals(new BigDecimal(expectedRate), result);
        }

        @ParameterizedTest(name = "{0} at {1} months with HALFPRICE costs ${3}")
        @CsvSource({
                "BASIC, 0, HALFPRICE, 25.00",
                "PRO, 0, HALFPRICE, 75.00",
                "ENTERPRISE, 0, HALFPRICE, 250.00",
                "BASIC, 13, HALFPRICE, 22.50",
                "PRO, 13, HALFPRICE, 67.50",
                "ENTERPRISE, 13, HALFPRICE, 225.00",
                "BASIC, 37, HALFPRICE, 18.75",
                "PRO, 37, HALFPRICE, 56.25",
                "ENTERPRISE, 37, HALFPRICE, 187.50"
        })
        @DisplayName("Applies HALFPRICE after longevity discounts")
        void appliesHalfPriceAfterLongevityDiscount(String tier, int activeMonths,
                String voucherCode, String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate(tier, activeMonths, voucherCode);

            assertEquals(new BigDecimal(expectedRate), result);
        }
    }

    @Nested
    @DisplayName("Edge case tests")
    class EdgeCaseTests {

        @Test
        @DisplayName("Keeps the result at zero when a voucher would make it negative")
        void floorsFinalRateAtZero() {
            BigDecimal result = service.calculateMonthlyRate("BASIC", 37, "SAVE20");

            assertEquals(new BigDecimal("17.50"), result);
        }

        @ParameterizedTest(name = "{0} months preserves the expected discount boundary")
        @CsvSource({
                "12, 50.00",
                "13, 45.00",
                "36, 45.00",
                "37, 37.50"
        })
        @DisplayName("Handles exact longevity threshold boundaries")
        void handlesExactLongevityBoundaries(int activeMonths, String expectedRate) {
            BigDecimal result = service.calculateMonthlyRate("BASIC", activeMonths, null);

            assertEquals(new BigDecimal(expectedRate), result);
        }
    }

    @Nested
    @DisplayName("Exception tests")
    class ExceptionTests {

        @ParameterizedTest(name = "Invalid voucher {0} is rejected")
        @CsvSource({
                "EXPIRED",
                "RANDOM",
                "''"
        })
        @DisplayName("Rejects invalid voucher codes")
        void rejectsInvalidVoucherCodes(String voucherCode) {
            assertThrows(InvalidVoucherException.class,
                    () -> service.calculateMonthlyRate("BASIC", 0, voucherCode));
        }

        @Test
        @DisplayName("Rejects a null tier")
        void rejectsNullTier() {
            assertThrows(IllegalArgumentException.class,
                    () -> service.calculateMonthlyRate(null, 0, null));
        }

        @Test
        @DisplayName("Rejects negative active months")
        void rejectsNegativeActiveMonths() {
            assertThrows(IllegalArgumentException.class,
                    () -> service.calculateMonthlyRate("BASIC", -1, null));
        }
    }
}
