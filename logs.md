
Step 1 and 2 logs:

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.example:subscription-pricing >------------------
[INFO] Building subscription-pricing 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- clean:3.4.1:clean (default-clean) @ subscription-pricing ---
[INFO] Deleting /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/target
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ subscription-pricing ---
[INFO] Copying 1 resource from src/main/resources to target/classes
[INFO] Copying 0 resource from src/main/resources to target/classes
[INFO] 
[INFO] --- compiler:3.14.1:compile (default-compile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 1 source file with javac [debug parameters release 17] to target/classes
[INFO] 
[INFO] --- resources:3.3.1:testResources (default-testResources) @ subscription-pricing ---
[INFO] skip non existing resourceDirectory /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/resources
[INFO] 
[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed dependency.
[INFO] Compiling 1 source file with javac [debug parameters release 17] to target/test-classes
[INFO] -------------------------------------------------------------
[ERROR] COMPILATION ERROR : 
[INFO] -------------------------------------------------------------
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[18,13] cannot find symbol
  symbol:   class SubscriptionPricingService
  location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[22,23] cannot find symbol
  symbol:   class SubscriptionPricingService
  location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[181,26] cannot find symbol
  symbol:   class InvalidVoucherException
  location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest.ExceptionTests
[INFO] 3 errors 
[INFO] -------------------------------------------------------------
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.774 s
[INFO] Finished at: 2026-09-10T18:40:18+05:30
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.14.1:testCompile (default-testCompile) on project subscription-pricing: Compilation failure: Compilation failure: 
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[18,13] cannot find symbol
[ERROR]   symbol:   class SubscriptionPricingService
[ERROR]   location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[22,23] cannot find symbol
[ERROR]   symbol:   class SubscriptionPricingService
[ERROR]   location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest
[ERROR] /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/java/com/example/subscriptionpricing/SubscriptionPricingServiceTest.java:[181,26] cannot find symbol
[ERROR]   symbol:   class InvalidVoucherException
[ERROR]   location: class com.example.subscriptionpricing.SubscriptionPricingServiceTest.ExceptionTests
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException


Step 3 logs:

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.example:subscription-pricing >------------------
[INFO] Building subscription-pricing 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- clean:3.4.1:clean (default-clean) @ subscription-pricing ---
[INFO] Deleting /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/target
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ subscription-pricing ---
[INFO] Copying 1 resource from src/main/resources to target/classes
[INFO] Copying 0 resource from src/main/resources to target/classes
[INFO] 
[INFO] --- compiler:3.14.1:compile (default-compile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 3 source files with javac [debug parameters release 17] to target/classes
[INFO] 
[INFO] --- resources:3.3.1:testResources (default-testResources) @ subscription-pricing ---
[INFO] skip non existing resourceDirectory /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/resources
[INFO] 
[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed dependency.
[INFO] Compiling 1 source file with javac [debug parameters release 17] to target/test-classes
[INFO] 
[INFO] --- surefire:3.5.6:test (default-test) @ subscription-pricing ---
[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running Subscription pricing service
[INFO] Running Exception tests
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.132 s -- in Exception tests
[INFO] Running Edge case tests
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.031 s -- in Edge case tests
[INFO] Running Voucher code tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.068 s -- in Voucher code tests
[INFO] Running Longevity discount tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.044 s -- in Longevity discount tests
[INFO] Running Base tier pricing tests
[INFO] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.028 s -- in Base tier pricing tests
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.325 s -- in Subscription pricing service
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 57, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.990 s
[INFO] Finished at: 2026-09-10T19:12:17+05:30
[INFO] ------------------------------------------------------------------------


Steps 4 logs:

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.example:subscription-pricing >------------------
[INFO] Building subscription-pricing 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- clean:3.4.1:clean (default-clean) @ subscription-pricing ---
[INFO] Deleting /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/target
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ subscription-pricing ---
[INFO] Copying 1 resource from src/main/resources to target/classes
[INFO] Copying 0 resource from src/main/resources to target/classes
[INFO] 
[INFO] --- compiler:3.14.1:compile (default-compile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 3 source files with javac [debug parameters release 17] to target/classes
[INFO] 
[INFO] --- resources:3.3.1:testResources (default-testResources) @ subscription-pricing ---
[INFO] skip non existing resourceDirectory /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/resources
[INFO] 
[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed dependency.
[INFO] Compiling 1 source file with javac [debug parameters release 17] to target/test-classes
[INFO] 
[INFO] --- surefire:3.5.6:test (default-test) @ subscription-pricing ---
[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running Subscription pricing service
[INFO] Running Exception tests
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.156 s -- in Exception tests
[INFO] Running Edge case tests
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.044 s -- in Edge case tests
[INFO] Running Voucher code tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.070 s -- in Voucher code tests
[INFO] Running Longevity discount tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.047 s -- in Longevity discount tests
[INFO] Running Base tier pricing tests
[INFO] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.027 s -- in Base tier pricing tests
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.369 s -- in Subscription pricing service
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 57, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.984 s
[INFO] Finished at: 2026-09-10T19:25:32+05:30
[INFO] ------------------------------------------------------------------------



Steps 5 logs:

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.example:subscription-pricing >------------------
[INFO] Building subscription-pricing 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- clean:3.4.1:clean (default-clean) @ subscription-pricing ---
[INFO] Deleting /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/target
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ subscription-pricing ---
[INFO] Copying 1 resource from src/main/resources to target/classes
[INFO] Copying 0 resource from src/main/resources to target/classes
[INFO] 
[INFO] --- compiler:3.14.1:compile (default-compile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 3 source files with javac [debug parameters release 17] to target/classes
[INFO] 
[INFO] --- resources:3.3.1:testResources (default-testResources) @ subscription-pricing ---
[INFO] skip non existing resourceDirectory /Users/vishvajit.kolekar/Desktop/Training-Assignment/Test Driven Development Assignment/subscription-pricing/src/test/resources
[INFO] 
[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ subscription-pricing ---
[INFO] Recompiling the module because of changed dependency.
[INFO] Compiling 1 source file with javac [debug parameters release 17] to target/test-classes
[INFO] 
[INFO] --- surefire:3.5.6:test (default-test) @ subscription-pricing ---
[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running Subscription pricing service
[INFO] Running Exception tests
[INFO] Tests run: 10, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.135 s -- in Exception tests
[INFO] Running Edge case tests
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.034 s -- in Edge case tests
[INFO] Running Voucher code tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.064 s -- in Voucher code tests
[INFO] Running Longevity discount tests
[INFO] Tests run: 18, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.054 s -- in Longevity discount tests
[INFO] Running Base tier pricing tests
[INFO] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.022 s -- in Base tier pricing tests
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.381 s -- in Subscription pricing service
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 62, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.807 s
[INFO] Finished at: 2026-09-10T19:51:03+05:30
[INFO] ------------------------------------------------------------------------
