import React from 'react'
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='ProfileCard'>
      <div className="ProfileImages">
        <img
          src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"}
          alt="cover"
        />
        <img
          src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
          alt="profile"
        />
      </div>

      <div className="ProfileName">
        <span className="name">{user.firstname} {user.lastname}</span>

        {user.headline && <span className="headline">{user.headline}</span>}

        {(user.currentRole || user.worksAt) && (
          <span className="role-info">
            {user.currentRole ? user.currentRole : ''} 
            {user.currentRole && user.worksAt ? ' at ' : ''}
            {user.worksAt ? user.worksAt : ''}
          </span>
        )}

        {user.livesin && <span className="location">📍 {user.livesin}</span>}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location !== "profilePage" && (
        <span>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
