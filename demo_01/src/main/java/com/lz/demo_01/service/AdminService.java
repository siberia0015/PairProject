package com.lz.demo_01.service;

import com.lz.demo_01.pojo.Admin;

import java.util.List;

public interface AdminService {
    //查找管理员用户
    List<Admin> findAdmin(Admin admin);
    //修改密码
    int changePwd(Admin admin2);
}
