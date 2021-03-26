package com.pairing.controller;

import com.pairing.bean.User;
import com.pairing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;

@Controller
public class IndexController {

    @Autowired
    UserService userService;
    /**
     * 返回登录页面
     * @return
     */
    @GetMapping(value = {"/", "/login"})
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String judLogin(User user, HttpSession session, Model model) {
        if (userService.getUser(user.getUserName(), user.getPassword())) {
            session.setAttribute("loginUser", user);
            return "redirect:/main.html";
        } else {
            model.addAttribute("msg","用户名或密码错误！");
            return "login";
        }
    }

    /**
     * 返回main页面
     * @return
     */
    @GetMapping("/main.html")
    public String mainPage(HttpSession session, Model model) {
        return "main";
    }

    @GetMapping("/log_off")
    public String logOff(HttpSession session) {
        session.removeAttribute("loginUser");
        return "/";
    }
}
