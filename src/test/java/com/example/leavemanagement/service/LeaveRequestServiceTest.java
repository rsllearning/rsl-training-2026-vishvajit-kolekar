package com.example.leavemanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.leavemanagement.dto.RequestDto;
import com.example.leavemanagement.dto.ResponseDto;
import com.example.leavemanagement.exception.LeaveRequestNotFoundException;
import com.example.leavemanagement.model.LeaveRequest;
import com.example.leavemanagement.repository.LeaveRequestRepository;
import java.time.LocalDate;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class LeaveRequestServiceTest {

    @Mock
    private LeaveRequestRepository repository;

    @InjectMocks
    private LeaveRequestService service;

    @Test
    void createSetsPendingStatusByDefault() {
        RequestDto request = new RequestDto();
        request.setEmployeeId("101");
        request.setLeaveType("Amit");
        request.setStartDate(LocalDate.of(2026, 12, 1));
        request.setEndDate(LocalDate.of(2026, 12, 2));
        request.setReason("vacation");

        when(repository.save(org.mockito.ArgumentMatchers.any(LeaveRequest.class)))
                .thenAnswer(
                        invocation -> invocation.getArgument(0));

        ResponseDto result = service.createLeave(request);

        assertEquals("PENDING", result.getStatus());
        assertEquals("101", result.getEmployeeId());
    }

    @Test
    void findByIdThrowsExceptionWhenRequestDoesNotExist() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(LeaveRequestNotFoundException.class, () -> service.findById(1L));
    }

    @Test
    void deleteLeaveTest() {
        LeaveRequest request = new LeaveRequest();
        when(repository.findById(1L)).thenReturn(Optional.of(request));

        service.deleteLeave(1L);

        verify(repository).delete(request);
    }
}
