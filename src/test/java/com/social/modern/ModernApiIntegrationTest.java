package com.social.modern;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ModernApiIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void publicProfileMatchesGoldenResponse() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/api/v2/profile?user_id=1&requester_id=1", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"id\":1");
        assertThat(response.getBody()).contains("\"username\":\"alice\"");
        assertThat(response.getBody()).contains("\"follower_count\":500");
        assertThat(response.getBody()).contains("\"badges\":[]");
    }

    @Test
    void privateProfileMatchesGoldenResponse() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/api/v2/profile?user_id=2&requester_id=3", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
        assertThat(response.getBody()).isEqualTo("{\"error\":\"Profile is private\"}");
    }

    @Test
    void missingProfileMatchesLegacyStatusAndBody() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/api/v2/profile?user_id=999&requester_id=1", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo("{\"error\":\"Not found\"}");
    }

    @Test
    void settingsFormMatchesGoldenResponse() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("mute_notifications", "true");

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/api/v2/settings?user_id=1", new HttpEntity<>(form, headers), String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("{\"status\":\"success\"}");
    }

    @Test
    void invalidSettingsMatchesLegacyStatusAndEmptyBody() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("mute_notifications", "TRUE");

        ResponseEntity<String> response = restTemplate.postForEntity(
                "/api/v2/settings?user_id=1", new HttpEntity<>(form, headers), String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isNullOrEmpty();
    }

        @Test
        void requiredRequestParametersReturnBadRequestWhenMissing() {
        ResponseEntity<String> profileResponse = restTemplate.getForEntity(
            "/api/v2/profile?requester_id=1", String.class);
        ResponseEntity<String> feedResponse = restTemplate.getForEntity(
            "/api/v2/feed", String.class);
        ResponseEntity<String> settingsResponse = restTemplate.postForEntity(
            "/api/v2/settings?user_id=1", null, String.class);

        assertThat(profileResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(feedResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(settingsResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        }

    @Test
    void feedMatchesGoldenResponseAndEmptyFeed() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                "/api/v2/feed?user_id=1", String.class);
        ResponseEntity<String> emptyFeed = restTemplate.getForEntity(
                "/api/v2/feed?user_id=3", String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"id\":104");
        assertThat(response.getBody()).contains("\"id\":102");
        assertThat(response.getBody()).contains("\"created_at\":1700000030");
        assertThat(response.getBody()).doesNotContain("\"id\":103");
        assertThat(emptyFeed.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(emptyFeed.getBody()).isEqualTo("[]");
    }
}