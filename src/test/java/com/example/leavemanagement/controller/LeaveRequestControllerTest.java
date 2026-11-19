package com.example.leavemanagement.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.leavemanagement.dto.ResponseDto;
import com.example.leavemanagement.service.LeaveRequestService;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(LeaveRequestController.class)
class LeaveRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeaveRequestService service;

    @Test
    void createLeaveRequestReturnsSuccess() throws Exception {
        when(service.createLeave(any())).thenReturn(new ResponseDto(
                1L, "101", "Suraj", LocalDate.of(2026, 12, 1),
                LocalDate.of(2026, 12, 2), "Vacation", "PENDING"));

        mockMvc.perform(post("/leaves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"employeeId\":\"E1\",\"leaveType\":\"Annual\",\"startDate\":\"2026-12-01\",\"endDate\":\"2026-12-02\",\"reason\":\"Vacation\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void createLeaveRejectsInvalidRequest() throws Exception {
        mockMvc.perform(post("/leaves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"employeeId\":\"\",\"leaveType\":\"Annual\"}"))
                .andExpect(status().isBadRequest());
    }
}
