# Step 6: TDD with AI — Reflection

## 1. Where AI Helped Me

AI helped me save time mainly while creating the initial test cases. I provided the business rules and expected behavior in the prompt, and it generated test structure with nested test classes, parameterized tests, and exception checks.

This gave me a starting point for testing the three subscription tiers, different month ranges, voucher codes, and invalid inputs. It also made the implementation part easier because the tests clearly showed what the SubscriptionPricingService was expected to return for different inputs.

Instead of writing every test and implementation from the beginning, I could use AI to generate the first version and then review and modify it.

## 2. Problems I Found in the AI-Generated Tests

I also noticed that the tests did not check whether voucher codes were case-sensitive. I added cases such as save20 and halfprice and verified that they are rejected.

During the additional edge case testing, I also added cases for whitespace around vouchers, empty and lowercase tiers, unknown tiers, extreme integer values, and invalid vouchers after the 25% discount.

This showed me that I should not assume that AI-generated tests are correct just because they compile or look complete.

## 3. How TDD Helped During Implementation

The RED phase helped me start with the expected behavior before writing the production code. The tests initially failed because SubscriptionPricingService had not been implemented yet.

After all the tests passed, I moved to the REFACTOR phase. I cleaned up the production code by extracting constants and helper methods while running the tests again to make sure the behavior did not change.

The final test suite had 62 passing tests.

## 4. What I Learned

The main thing I learned is that AI can make test creation and implementation faster, but I still need to verify the output myself.

The tests need to check the actual business requirements rather than just checking whether the code runs.

I also learned the importance of following the RED, GREEN, REFACTOR process. Writing the tests first gave me a clear idea of what the service should do, and having the tests in place made it safer to refactor the implementation later.
