package com.app.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<String> handleNotFoundError(IllegalArgumentException e) {
    log.error(e.getMessage());
    return ResponseEntity.badRequest().body(e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleServerError(Exception ex) {
    log.error(ex.getMessage());
    return ResponseEntity.status(500).body("Internal Server Error, please check server logs");
  }

}
