import React from 'react';
import { picture_content_template } from '../Config/style_templates';
import $ from "jquery";
import Video from '../Components/Video/Video';

const VIDEO_FILE_EXTENTIONS = ["mp4", "mov"];
const PHOTO_FILE_EXTENTIONS = ["png", "jpg", "jpeg", "gif"]

export function isVideo(url) {
    let ext = url.split('.')[1];
    if(ext){
        if(VIDEO_FILE_EXTENTIONS.includes(ext)) {
            return true; 
        }
        return false; 
    }
    return false; 
}

export function isPhoto(url) {
    let ext = url.split('.')[1];
    if(ext){
        if(PHOTO_FILE_EXTENTIONS.includes(ext)) {
            return true; 
        }
        return false; 
    }
    return false; 
}

export function makeVideo(project, url, x) {
    let muted = true; 
    if(project.media_dimensions) {
        let media_dim = project.media_dimensions[x].split(":");
        var width_ = $(window).width() * parseFloat(media_dim[2]);
        var height_ = width_ * (media_dim[1]/media_dim[0])
        // left = 
      }
      if(project.sound) {
        muted = false; 
      }
    return <Video src_url={project.project_path + url} x={x} id={project.id+"video"+x} w={width_} h={height_} muted={muted}/>
}
export function makePhoto(project, url, x) {
    let media_dim
    if(project.media_dimensions[x]) {
        media_dim = project.media_dimensions[x].split(":");
    }
    else {
        media_dim = "1:1:.3"
    }
    let width = $(window).width() * parseFloat(media_dim[2]);
    let height = width * (media_dim[1]/media_dim[0])
    return <div style={{...picture_content_template, 
        'backgroundImage':"url("+project.project_path+url+")", 
        width: width, height: height}} id={project.id+"photo"+x}/>
}
//mobile
export function makePhotoMobile(project, url, x) {
    let media_dim
    if(project.media_dimensions[x]) {
        media_dim = project.media_dimensions[x].split(":");
    }
    else {
        media_dim = "1:1:.3"
    }
    let width = $(window).width()-50;
    let height = width * (media_dim[1]/media_dim[0])
    return <div style={{...picture_content_template, 
        'backgroundImage':"url("+project.project_path+url+")", 
        width: width, 
        height: height,
        marginTop: "25px",
        marginBottom: "25px"}} id={project.id+"photo"+x}/>
}

export function makeVideoMobile(project, url, x) {
    let width_;
    let height_;
    if(project.media_dimensions) {
        let media_dim = project.media_dimensions[x].split(":");
        width_ = $(window).width()-50;
        height_ = width_ * (media_dim[1]/media_dim[0])
      }
    return <Video src_url={project.project_path + url} x={x} id={project.id+"video"+x} w={width_} h={height_}/>
}