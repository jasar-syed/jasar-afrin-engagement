package com.jasaraffin.engagement.controller;

import com.jasaraffin.engagement.entity.Rsvp;
import com.jasaraffin.engagement.repository.RsvpRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = "*")
public class RsvpController {

    private final RsvpRepository repository;

    public RsvpController(RsvpRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Rsvp submit(@RequestBody Rsvp rsvp) {
        return repository.save(rsvp);
    }

    @GetMapping
    public List<Rsvp> getAll() {
        return repository.findAll();
    }
}
