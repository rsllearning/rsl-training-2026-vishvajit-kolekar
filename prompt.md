## Step 1: Write Failing Tests First (RED Phase)

### Prompt

**Role:**
Act as a Senior QA Engineer with experience in Java, JUnit 5, Spring Boot, and testing currency-related calculations.

**Target Class:**
I need to create unit tests for a Spring Boot service SubscriptionPricingService in the package com.example.subscriptionpricing.

The service will have the following method:

BigDecimal calculateMonthlyRate(String tier, int activeMonths, String voucherCode)

Parameters:
* tier: BASIC, PRO, or ENTERPRISE
* activeMonths: number of months the account has been active
* voucherCode: can be SAVE20, HALFPRICE, null, or an invalid string

### Business Rules

1. Base monthly rates:
   * BASIC = $50.00
   * PRO = $150.00
   * ENTERPRISE = $500.00

2. Longevity discounts:
   * More than 12 months -> 10% discount
   * More than 36 months -> 25% discount
   * Exactly 12 or 36 months -> no discount

3. Voucher codes are applied after the longevity discount:
   * SAVE20 -> subtract $20.00
   * HALFPRICE -> apply a 50% discount
   * null -> no voucher
   * Any other value -> throw InvalidVoucherException

4. The final amount:
   * Must not be less than $0.00
   * Should be rounded to 2 decimal places using HALF_UP

### Cases to Cover

* 10% discount for 13, 24, and 36 months
* 25% discount for 37, 48, and 60 months
* Both valid vouchers with different discount levels
* SAVE20 resulting in an amount below zero
* Boundary values: 12, 13, 36, and 37 months
* Invalid vouchers such as EXPIRED, RANDOM, and ""
* null tier

At this stage, only create the test class. Do not create the implementation.



## Step 2: Audit Table

| # | Issue                                                                                                 | Test                         | Severity | Fix                                                                                                |
| - | ----------------------------------------------------------------------------------------------------- | ---------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| 1 | The test expected $17.50, so it did not actually check that the final amount is floored at $0.00. | floorsFinalRateAtZero      | High     | Changed the input so SAVE20 makes the amount negative and changed the expected result to 0.00. |
| 2 | voucher codes case-sensitivity check                     | rejectsInvalidVoucherCodes | Medium   | Added test for save20 and halfprice and verified that both throw InvalidVoucherException.             |

### Step 2: Prompt

The initial test suite has the two issues identified in the audit table. Update the tests to fix both issues.

1. Fix floorsFinalRateAtZero so that it actually verifies the final amount is 0.00 when SAVE20 makes the calculated amount negative.
2. Add lowercase versions of the valid voucher codes and verify that they are rejected with InvalidVoucherException.

Do not change the production code. Only update the test cases required to cover these issues.

## Step 3: Implement Against Tests (GREEN Phase)

### Prompt

The test class is now finalized and should be treated as the specification for SubscriptionPricingService.

Implement SubscriptionPricingService in Java using Spring Boot so that all existing tests pass.

Requirements:

* Use BigDecimal for pricing calculations.
* Apply the longevity discount before the voucher.
* Apply vouchers only when they are valid.
* Return 0.00 when the final amount would be negative.
* Round the final amount to 2 decimal places using HALF_UP.
* Throw IllegalArgumentException for invalid tier values and negative activeMonths.
* Throw InvalidVoucherException for invalid voucher codes.
* Do not modify the existing tests to make them pass.
* Keep the implementation as simple as possible.

After implementation, run all test cases and make sure all tests pass.

## Step 4: Refactor Phase

Prompt:  Refactor production code to use modern
Java 17+ features while preserving existing logic and without chnaging the existing tests.

## Step 5: Adversarial Edge Case Matrix

Prompt: You are an Adversarial QA Engineer. Your goal is to find issues in the SubscriptionPricingService by identifying untested edge cases, boundary conditions, invalid inputs, and negative scenarios.


| # | Edge Case | Input | Expected Result | Reason |
|---|---|---|---|---|
| 1 | Voucher with spaces | ("BASIC", 0, " SAVE20 ") | InvalidVoucherException | The voucher should only match when the exact code is provided. |
| 2 | Only spaces as voucher | ("BASIC", 0, "   ") | InvalidVoucherException | Whitespace should not be treated as a valid voucher. |
| 3 | Empty tier | ("", 0, null) | IllegalArgumentException | An empty tier is not a valid pricing tier. |
| 4 | Lowercase tier | ("basic", 0, null) | IllegalArgumentException | Tier values should be case-sensitive. |
| 5 | Unknown tier | ("ULTIMATE", 0, null) | IllegalArgumentException | Unknown tiers should be rejected. |
| 6 | Maximum active months | ("PRO", Integer.MAX_VALUE, null) | 112.50 | Checks that a very large valid month value is handled correctly and gets the 25% discount. |
| 7 | Minimum active months | ("PRO", Integer.MIN_VALUE, null) | IllegalArgumentException | Checks that negative values are rejected even at the minimum integer value. |
| 8 | Invalid voucher with 25% discount | ("ENTERPRISE", 37, "EXPIRED") | InvalidVoucherException | Invalid vouchers should still be rejected when the account qualifies for the highest longevity discount. |

### Edge engineering justification

**1. Voucher with spaces**

" SAVE20 " looks similar to a valid voucher, but it is not the exact SAVE20 code. This checks that the implementation does not automatically trim or modify the voucher before validating it.

**2. Maximum active months**

Integer.MAX_VALUE is the largest possible value for activeMonths. This checks that the service can handle a very large valid value and still apply the correct 25% discount.

**2. Minimum active months**

Integer.MIN_VALUE is an invalid negative value. This verifies that negative values are rejected before any pricing calculation is performed.

**4. Invalid voucher after the 25% discount**

An invalid voucher should throw InvalidVoucherException even when the account qualifies for the 25% longevity discount. This checks that the voucher validation is not skipped for this case.



