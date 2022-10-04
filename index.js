import { tweetsData } from "/data.js";

const btn =  document.getElementById("tweet-btn");
const txtArea = document.getElementById("txt")
document.addEventListener("click", function(e){
   
  if(e.target.dataset.like){
      handleLikeClick(e.target.dataset.like)
  }

})


//  console.log(handleLikeClick())

function getFeedHtml(tweets){
    let feedHtml = "";
       tweets.forEach(tweet => {
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i> ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i> ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        `
        
           })
          return feedHtml;
        }
     
        function render(){
            document.getElementById("feed").innerHTML = getFeedHtml(tweetsData)
        }

       render();