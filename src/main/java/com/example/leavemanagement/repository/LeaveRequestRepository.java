package com.example.leavemanagement.repository;

import com.example.leavemanagement.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
}
