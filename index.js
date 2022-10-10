import { tweetsData } from "/data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



document.addEventListener("click", function(e){
  
  if(e.target.dataset.like){
      handleLikeClick(e.target.dataset.like)
  }
  else if(e.target.dataset.retweet){
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if(e.target.dataset.reply){
    handleReplyClick(e.target.dataset.reply)
  }
  else if(e.target.dataset.cls){
    handleClearClick(e.target.dataset.cls)
  }
  else if(e.target.id === "tweet-btn"){
    handleTweetBtnClick()
  }

})


function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
      return tweet.uuid === tweetId;
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--;
    }
    else{
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

  render()
}
function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0]
    if(targetTweetObj.isRetweeted){
         targetTweetObj.retweets--;
    }
    else{
    targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render()
}
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")

}
function handleClearClick(tweetId){
      const clrtweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0]
      const index = tweetsData.indexOf(clrtweet);
if (index > -1) { 
  tweetsData.splice(index, 1); 
}
 
     render();
 }

    

function handleTweetBtnClick(){
  const tweetInput = document.getElementById("txt")
    if(tweetInput.value){
tweetsData.unshift({
    handle: `@f8_makinde`,
    profilePic: `images/my portfolio pics.png`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4()
  })
  }
 
  tweetInput.value = ""

render()
}

function getFeedHtml(tweets){
    let feedHtml = "";

       tweets.forEach(tweet => {
        let likeIconClass = '';
        if(tweet.isLiked){
           likeIconClass = 'liked';
         
        }
        let retweetIconClass = '';
        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted';
          
        }

        let repliesHtml = '';
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })

        }
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <span>
                    <p class="handle">${tweet.handle}</p>
                    <i class="fa-solid fa-trash-can delete" data-cls="${tweet.uuid}"></i>
                    </span>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i> ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i> ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div id="replies-${tweet.uuid}" class="hidden">
           ${repliesHtml}
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


const toggle = document.getElementById('toogle-dark')
const body = document.querySelector('body');
 
toggle.addEventListener("click", function(){
  this.classList.toggle("fa-moon")
  if(this.classList.toggle('fa-sun')){
    body.style.background = "white";
    body.style.color = '#555';
    body.style.transition = "2s"
  }
  else{
   
    body.style.background = "black";
    body.style.color = "white";
    body.style.transition = "2s";
  }
})

  
