package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.repository.BlogRepository;
import lt.codeacademy.blog.repository.UserRepository;
import lt.codeacademy.blog.service.BlogService;
import lt.codeacademy.blog.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BlogController.class)
class BlogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BlogService blogService;

    @MockBean
    private BlogRepository blogRepository;

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void createOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/create")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = {"USER"})
    public void createWrongRoleForbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/create")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void createGetNotAllowed() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/blog/create")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void createNoCsrfForbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/create")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void deleteOk() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/delete")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = {"USER"})
    public void deleteWrongRoleForbidden() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/delete")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void deleteGetNotAllowed() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/blog/delete")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void deleteNoCsrfForbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/blog/delete")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}