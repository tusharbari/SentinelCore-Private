package backend.service;

import backend.entity.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String login(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!user.getPassword().equals(password)) {
            return "Invalid Password";
        }

        return "Login Successful";
    }
}