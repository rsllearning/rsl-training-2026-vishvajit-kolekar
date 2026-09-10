package com.example.subscriptionpricing;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Service;

@Service
public class SubscriptionPricingService {

    private static final int STANDARD_DISCOUNT_MONTHS = 12;
    private static final int PREMIUM_DISCOUNT_MONTHS = 36;
    private static final BigDecimal STANDARD_DISCOUNT = new BigDecimal("0.10");
    private static final BigDecimal PREMIUM_DISCOUNT = new BigDecimal("0.25");
    private static final BigDecimal BASIC_RATE = new BigDecimal("50.00");
    private static final BigDecimal PRO_RATE = new BigDecimal("150.00");
    private static final BigDecimal ENTERPRISE_RATE = new BigDecimal("500.00");
    private static final BigDecimal SAVE20_AMOUNT = new BigDecimal("20.00");
    private static final BigDecimal HALFPRICE_MULTIPLIER = new BigDecimal("0.50");
    private static final BigDecimal ZERO = BigDecimal.ZERO.setScale(2);

    public BigDecimal calculateMonthlyRate(String tier, int activeMonths, String voucherCode) {
        if (activeMonths < 0) {
            throw new IllegalArgumentException("Active months cannot be negative");
        }
        if (tier == null) {
            throw new IllegalArgumentException("Tier cannot be null");
        }

        BigDecimal discountedRate = applyLongevityDiscount(
                baseRateFor(tier), activeMonths);
        return normalize(applyVoucher(discountedRate, voucherCode));
    }

    private BigDecimal baseRateFor(String tier) {
        return switch (tier) {
            case "BASIC" -> BASIC_RATE;
            case "PRO" -> PRO_RATE;
            case "ENTERPRISE" -> ENTERPRISE_RATE;
            default -> throw new IllegalArgumentException("Unknown tier: " + tier);
        };
    }

    private BigDecimal applyLongevityDiscount(BigDecimal baseRate, int activeMonths) {
        BigDecimal discount = activeMonths > PREMIUM_DISCOUNT_MONTHS
                ? PREMIUM_DISCOUNT
                : activeMonths > STANDARD_DISCOUNT_MONTHS ? STANDARD_DISCOUNT : BigDecimal.ZERO;

        return baseRate.multiply(BigDecimal.ONE.subtract(discount))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal normalize(BigDecimal rate) {
        return rate.max(ZERO).setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal applyVoucher(BigDecimal rate, String voucherCode) {
        if (voucherCode == null) {
            return rate;
        }

        return switch (voucherCode) {
            case "SAVE20" -> rate.subtract(SAVE20_AMOUNT);
            case "HALFPRICE" -> rate.multiply(HALFPRICE_MULTIPLIER);
            default -> throw new InvalidVoucherException("Invalid voucher code: " + voucherCode);
        };
    }
}
