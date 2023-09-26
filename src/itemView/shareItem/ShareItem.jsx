import { FacebookIcon, FacebookShareCount,FacebookMessengerShareButton,FacebookMessengerIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton, EmailIcon, EmailShareButton } from "react-share"
import './ShareItem.css'
import { Modal, message } from "antd"
import logo from '../../assets/images/suitapp-website-favicon-black.png'
export const useShare = (title, shareUrl) => {

  const openShare = () => {
      Modal.success({
          title:"Share " + title,
          icon: <img className="logo" src= {logo}/>,
          content :   <ShareItem shareUrl={shareUrl} title={title}/>
      })
  }
  return openShare
}
export default function ShareItem({shareUrl,title}) {


    return (
      <div className="Demo__container">
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <div>
            <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
              {count => count}
            </FacebookShareCount>
          </div>
        </div>

        <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div>
        <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <div className="Demo__some-network__share-count">&nbsp;</div>
        </div>
        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        </div>
    )
}