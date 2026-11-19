package com.example.leavemanagement.controller;

import com.example.leavemanagement.dto.RequestDto;
import com.example.leavemanagement.dto.ResponseDto;
import com.example.leavemanagement.service.LeaveRequestService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping
    public List<ResponseDto> findAllLeaves() {
        return leaveRequestService.findAllLeaves();
    }

    @GetMapping("/{id}")
    public ResponseDto findLeavesById(@PathVariable Long id) {
        return leaveRequestService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ResponseDto> createLeave(@Valid @RequestBody RequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leaveRequestService.createLeave(request));
    }

    @PutMapping("/{id}")
    public ResponseDto updateLeave(@PathVariable Long id, @Valid @RequestBody RequestDto request) {
        return leaveRequestService.updateLeave(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLeave(@PathVariable Long id) {

        leaveRequestService.deleteLeave(id);

        return ResponseEntity.ok("Deleted leave request successfully");
    }
}
