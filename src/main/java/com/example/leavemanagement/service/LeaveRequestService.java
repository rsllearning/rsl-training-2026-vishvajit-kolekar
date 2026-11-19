package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.RequestDto;
import com.example.leavemanagement.dto.ResponseDto;
import com.example.leavemanagement.exception.LeaveRequestNotFoundException;
import com.example.leavemanagement.model.LeaveRequest;
import com.example.leavemanagement.repository.LeaveRequestRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository repo;

    public LeaveRequestService(LeaveRequestRepository repository) {
        this.repo = repository;
    }

    public List<ResponseDto> findAllLeaves() {
        return repo.findAll().stream()
                .map(leave -> entityToDto(leave))
                .toList();
    }

    public ResponseDto findById(Long id) {
        Optional<LeaveRequest> leaveRequest = repo.findById(id);

        if (leaveRequest.isPresent()) {
            return entityToDto(leaveRequest.get());
        } else {
            throw new LeaveRequestNotFoundException(id);
        }
    }

    public ResponseDto createLeave(RequestDto request) {
        LeaveRequest leaveRequest = new LeaveRequest();

        leaveRequest.setEmployeeId(request.getEmployeeId());
        leaveRequest.setLeaveType(request.getLeaveType());

        leaveRequest.setStartDate(request.getStartDate());
        leaveRequest.setEndDate(request.getEndDate());
        leaveRequest.setReason(request.getReason());

        leaveRequest.setStatus("PENDING");
        return entityToDto(repo.save(leaveRequest));
    }

    public ResponseDto updateLeave(Long id, RequestDto request) {

        LeaveRequest leaveRequest = repo.findById(id).orElseThrow(
                () ->  new LeaveRequestNotFoundException(id)
        );

        leaveRequest.setEmployeeId(request.getEmployeeId());
        leaveRequest.setLeaveType(request.getLeaveType());

        leaveRequest.setStartDate(request.getStartDate());
        leaveRequest.setEndDate(request.getEndDate());
        leaveRequest.setReason(request.getReason());

        LeaveRequest result = repo.save(leaveRequest);

        return entityToDto(result);
    }

    public void deleteLeave(Long id) {
        Optional<LeaveRequest> leaveRequest = repo.findById(id);

        if (leaveRequest.isPresent()) {
            repo.delete(leaveRequest.get());
        } else {
            throw new LeaveRequestNotFoundException(id);
        }

    }

    private ResponseDto entityToDto(LeaveRequest leaveRequest) {
        return new ResponseDto(
                leaveRequest.getId(),
                leaveRequest.getEmployeeId(),
                leaveRequest.getLeaveType(),
                leaveRequest.getStartDate(),
                leaveRequest.getEndDate(),
                leaveRequest.getReason(),
                leaveRequest.getStatus());
    }
}
