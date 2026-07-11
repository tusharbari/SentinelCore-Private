package backend.controller;

import backend.entity.IOC;
import backend.service.IOCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ioc")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class IOCController {

    @Autowired
    private IOCService iocService;

    // Get All IOCs
    @GetMapping
    public List<IOC> getAllIOCs() {
        return iocService.getAllIOCs();
    }

    // Get IOC By ID
    @GetMapping("/{id}")
    public IOC getIOCById(@PathVariable Long id) {
        return iocService.getIOCById(id);
    }

    // Add IOC
    @PostMapping
    public IOC addIOC(@RequestBody IOC ioc) {
        return iocService.saveIOC(ioc);
    }

    // Update IOC
    @PutMapping("/{id}")
    public IOC updateIOC(@PathVariable Long id,
                         @RequestBody IOC ioc) {

        return iocService.updateIOC(id, ioc);
    }

    // Delete IOC
    @DeleteMapping("/{id}")
    public String deleteIOC(@PathVariable Long id) {

        iocService.deleteIOC(id);

        return "IOC Deleted Successfully";
    }
}