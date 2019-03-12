import React from 'react'
import { Button, Item } from 'semantic-ui-react'

function Profile({ avatar, username, onLogout }) {
  return (
    <div className="profile">
      <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src={avatar} />
          <Item.Content verticalAlign="middle">
            <Item.Content verticalAlign="middle">
              <span className="username">{username}</span>
              <br />
              <Button
                content="Sair"
                icon="right arrow"
                labelPosition="right"
                size="mini"
                onClick={() => onLogout()}
              />
            </Item.Content>
          </Item.Content>
        </Item>
      </Item.Group>
      <style jsx>{`
        .profile {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-align: center;
          -webkit-align-items: center;
          -webkit-box-align: center;
          align-items: center;
          justify-content: center;
          padding-top: 50px;
        }
        .profile .username {
          font-weight: bold;
          font-size: 1.8em;
        }
      `}</style>
    </div>
  )
}

export default Profile
