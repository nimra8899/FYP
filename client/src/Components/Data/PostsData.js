import postPic1 from '../../Img/postPic1.jpg';
import postPic2 from '../../Img/postPic2.jpg';
import postPic3 from '../../Img/postPic3.jpg';

export const PostsData = [
  {
    img: postPic1,
    userId: { firstname: 'Ritika', lastname: 'Singh' },
    desc: "Happy New Year all friends 🤩🎉🎉! #2023",
    likes: 5000,
    liked: true
  },
  {
    img: postPic2,
    userId: { firstname: 'Maryam', lastname: 'Khan' },
    desc: "1st Day office 🤩",
    likes: 4000,
    liked: false
  },
  {
    img: postPic3,
    userId: { firstname: 'Raj', lastname: 'Patel' },
    desc: "Happy Birthday 🎂🎊🎉",
    likes: 1000,
    liked: false
  }
]
