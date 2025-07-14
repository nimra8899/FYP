import React, { useState, useRef } from 'react';
import './PostShare.css';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';
import EmojiPicker from 'emoji-picker-react';

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const dispatch = useDispatch();
  const imageRef = useRef();
  const videoRef = useRef();
  const desc = useRef();

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isArticleMode, setIsArticleMode] = useState(false);
  const [articleContent, setArticleContent] = useState('');

  const onImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const onVideoChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setVideos((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (isArticleMode) {
      setArticleContent((prev) => prev + emojiData.emoji);
    } else {
      desc.current.value += emojiData.emoji;
    }
    setShowEmojiPicker(false);
  };

  const reset = () => {
    setImages([]);
    setVideos([]);
    if (desc.current) desc.current.value = '';
    setArticleContent('');
    setIsArticleMode(false);
    setShowEmojiPicker(false);
    setTimeout(() => desc.current?.focus(), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: isArticleMode ? articleContent : desc.current.value,
      isArticle: isArticleMode,
      images: [],
      videos: [],
    };

    try {
      for (const image of images) {
        const data = new FormData();
        const filename = Date.now() + image.name;
        data.append('name', filename);
        data.append('file', image);
        newPost.images.push(filename);
        await dispatch(uploadImage(data));
      }

      for (const video of videos) {
        const data = new FormData();
        const filename = Date.now() + video.name;
        data.append('name', filename);
        data.append('file', video);
        newPost.videos.push(filename);
        await dispatch(uploadImage(data));
      }

      await dispatch(uploadPost(newPost));
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt="Profile"
      />

      <div>
        {isArticleMode ? (
          <textarea
            className="article-input"
            placeholder="Write your article here..."
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            autoFocus
          />
        ) : (
          <input
            type="text"
            placeholder="What do you want to talk about?"
            ref={desc}
            required
          />
        )}

        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <PhotoOutlinedIcon />
            Photo
          </div>

          <div className="option" onClick={() => videoRef.current.click()}>
            <PlayCircleOutlineIcon />
            Video
          </div>

          <div
            className="option"
            onClick={() => {
              setIsArticleMode(!isArticleMode);
              setShowEmojiPicker(false);
            }}
          >
            📝 {isArticleMode ? 'Cancel Article' : 'Write an Article'}
          </div>

          <div
            className="option"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <InsertEmoticonIcon />
            Emoji
          </div>

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Post'}
          </button>

          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            ref={imageRef}
            onChange={onImageChange}
          />

          <input
            type="file"
            accept="video/*"
            multiple
            style={{ display: 'none' }}
            ref={videoRef}
            onChange={onVideoChange}
          />
        </div>

        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="media-preview-container">
          {images.map((img, index) => (
            <div className="previewImage" key={index}>
              <CloseOutlinedIcon onClick={() => removeImage(index)} />
              <img src={URL.createObjectURL(img)} alt="Preview" />
            </div>
          ))}

          {videos.map((vid, index) => (
            <div className="previewImage" key={index}>
              <CloseOutlinedIcon onClick={() => removeVideo(index)} />
              <video
                src={URL.createObjectURL(vid)}
                controls
                width="100%"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostShare;
