package backend.service;

import backend.entity.IOC;
import backend.repository.IOCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IOCService {

    @Autowired
    private IOCRepository iocRepository;

    public List<IOC> getAllIOCs() {
        return iocRepository.findAll();
    }

    public IOC getIOCById(Long id) {
        return iocRepository.findById(id).orElse(null);
    }

    public IOC saveIOC(IOC ioc) {
        return iocRepository.save(ioc);
    }

    public IOC updateIOC(Long id, IOC updatedIOC) {

        IOC existingIOC = iocRepository.findById(id).orElse(null);

        if (existingIOC == null) {
            return null;
        }

        existingIOC.setType(updatedIOC.getType());
        existingIOC.setValue(updatedIOC.getValue());
        existingIOC.setRiskLevel(updatedIOC.getRiskLevel());
        existingIOC.setSource(updatedIOC.getSource());
        existingIOC.setStatus(updatedIOC.getStatus());

        return iocRepository.save(existingIOC);
    }

    public void deleteIOC(Long id) {
        iocRepository.deleteById(id);
    }
}