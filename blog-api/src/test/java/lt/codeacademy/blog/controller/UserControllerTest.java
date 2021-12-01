package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.repository.UserRepository;
import lt.codeacademy.blog.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void registrationOk() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .post("/user/register")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void registrationNoCsrfForbidden() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .post("/user/register")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void registrationGetNotAllowed() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .get("/user/register")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    public void loginOk() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .post("/user/login")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void loginNoCsrfForbidden() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .post("/user/login")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void LoginGetNotAllowed() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .get("/user/login")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }
}