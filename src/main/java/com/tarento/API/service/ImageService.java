package com.tarento.API.service;

import com.tarento.API.Entity.Image;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ImageService {
    public Image create(Image image);
    public List<Image> viewAll();
    public Image viewById(int id);
}