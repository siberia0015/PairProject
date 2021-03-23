package com.pair.dao;

import com.pair.pojo.Keyword;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
public interface KeywordMapper {
    public int selectKeyword(String keyword,String publisher);
    public void updateKeyword(Keyword Keyword);
    public void insertKeyword(String kid,String keyword,String publisher,int num);
    public String selectKid(String keyword,String publisher);
    public int selectNum(String keyword,String publisher);
}
