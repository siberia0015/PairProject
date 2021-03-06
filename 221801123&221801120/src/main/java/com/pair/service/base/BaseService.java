package com.pair.service.base;


import com.pair.model.page.PageBean;

import java.util.HashMap;
import java.util.List;

public interface BaseService<T> {

    public void delete(Object id);

    /**
     * 分页查询
     * @param pageCode 需要查询的页码
     * @param pageSize 每页的大小
     * @param pageNumber 显示的页码数量
     * @param where where条件语句
     * @param params 参数列表
     * @param orderbys 排序条件，比如id desc
     * @return {@link PageBean}
     */
    public PageBean<T> pageSearch(int pageCode, int pageSize, int pageNumber, String where,
                                  List<Object> params, HashMap<String, String> orderbys);
}
