package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.repository.UserRepository;
import lt.codeacademy.blog.service.BlogService;
import lt.codeacademy.blog.service.CommentService;
import lt.codeacademy.blog.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CommentController.class)
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BlogService blogService;

    @MockBean
    private CommentService commentService;

    @Test
    @WithMockUser(roles = {"USER"})
    public void createOkUser() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("blog_id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comment/create")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void createOkAdmin() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("blog_id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comment/create")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = {"USER"})
    public void createNoCsrfForbidden() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("blog_id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comment/create")
                        .params(requestParams)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"USER"})
    public void createGetNotAllowed() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("blog_id", "0342d18f-9ea2-4dd9-ba00-a47e997a144d");
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/comment/create")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void deleteOk() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("id", "e394b01e-f6b2-469c-9af5-28c1b7118b15");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comment/delete")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void deleteNoCsrfForbidden() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("id", "e394b01e-f6b2-469c-9af5-28c1b7118b15");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comment/delete")
                        .params(requestParams)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"USER"})
    public void deleteGetNotAllowed() throws Exception {
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("blog_id", "e394b01e-f6b2-469c-9af5-28c1b7118b15");
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/comment/delete")
                        .params(requestParams)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isMethodNotAllowed());
    }

}