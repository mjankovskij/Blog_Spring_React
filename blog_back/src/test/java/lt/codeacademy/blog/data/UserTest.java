package lt.codeacademy.blog.data;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import javax.validation.*;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    public void saveValid() {
        User user = new User();
        user.setUsername("useris");
        user.setPassword("12151515153");
        user.setPasswordRepeat("12151515153");
        testEntityManager.persist(user);
        testEntityManager.flush();
    }

    @Test
    public void shortUsernameException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setUsername("sb");
            user.setPassword("12151515154");
            user.setPasswordRepeat("12151515154");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

    @Test
    public void longUsernameException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setUsername("userisuserisuserisusy");
            user.setPassword("1234567A");
            user.setPasswordRepeat("1234567A");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

    @Test
    public void nullUsernameException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setPassword("1234567A");
            user.setPasswordRepeat("1234567A");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

    @Test
    public void shortPasswordException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setUsername("useris");
            user.setPassword("5115");
            user.setPasswordRepeat("5115");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

    @Test
    public void nullPasswordException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setUsername("useris");
            user.setPasswordRepeat("1234567A");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

    @Test
    public void passwordNotSameException() {
        assertThrows(ConstraintViolationException.class, () -> {
            User user = new User();
            user.setUsername("sb");
            user.setPassword("12151515154");
            user.setPasswordRepeat("121515151");
            testEntityManager.persist(user);
            testEntityManager.flush();
        });
    }

}