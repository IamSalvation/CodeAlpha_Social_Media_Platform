// 1. Mock Database (State Management)
let posts = [
    {
        id: 1,
        author: "Coach Lola",
        handle: "lola_va_coach",
        content: "Consistency beats talent every single day. Keep showing up for your systems training! 🚀",
        likes: 5,
        hasLiked: false,
        comments: [
            { author: "Joshua Izuchukwu", content: "Absolutely spot on, Coach! Taking it one step at a time." }
        ]
    }
];

// 2. DOM Element Selectors
const postForm = document.getElementById('create-post-form');
const postInput = document.getElementById('post-input');
const timelineFeed = document.getElementById('timeline-feed');

// 3. Event Listener: Handle Form Submission (Creating a Post)
postForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page from refreshing

    const postContent = postInput.value.trim();
    if (!postContent) return;

    // Create a new post object
    const newPost = {
        id: Date.now(), // Unique ID using timestamp
        author: "Joshua Izuchukwu",
        handle: "josh_systems",
        content: postContent,
        likes: 0,
        hasLiked: false,
        comments: []
    };

    // Add new post to the front of our array database
    posts.unshift(newPost);

    // Clear input field and refresh the visual timeline
    postInput.value = '';
    renderTimeline();
});

// 4. Function: Render the Timeline Feed to the Screen
function renderTimeline() {
    timelineFeed.innerHTML = ''; // Clear current feed view

    posts.forEach(post => {
        // Build the HTML structure for a single post card
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.style.cssText = 'background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 16px; display: flex; flex-direction: column; gap: 12px;';

        // Inside layout content of the post
        postCard.innerHTML = `
            <div class="post-header" style="display: flex; gap: 10px; align-items: center;">
                <div class="mini-avatar" style="width: 40px; height: 40px; background: #e5e7eb; border-radius: 50%;"></div>
                <div>
                    <h4 style="font-size: 15px;">${post.author}</h4>
                    <p style="font-size: 12px; color: #6b7280;">@${post.handle}</p>
                </div>
            </div>
            <p class="post-content" style="font-size: 15px; line-height: 1.5;">${post.content}</p>
            <div class="post-actions" style="border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; padding: 8px 0; display: flex; gap: 24px;">
                <button onclick="toggleLike(${post.id})" style="background: none; border: none; cursor: pointer; color: ${post.hasLiked ? '#2563eb' : '#6b7280'}; font-weight: 600;">
                    👍 ${post.likes} ${post.hasLiked ? 'Liked' : 'Like'}
                </button>
            </div>
            <div class="comments-section" style="display: flex; flex-direction: column; gap: 8px;">
                <div class="comments-list" id="comments-${post.id}">
                    ${post.comments.map(comment => `
                        <div style="background: #f3f4f6; padding: 8px 12px; border-radius: 8px; font-size: 14px;">
                            <strong>${comment.author}:</strong> ${comment.content}
                        </div>
                    `).join('')}
                </div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." style="flex: 1; border: 1px solid #e5e7eb; border-radius: 20px; padding: 6px 12px; font-size: 13px; outline: none;">
                    <button onclick="addComment(${post.id})" style="background: #f3f4f6; border: none; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer;">Reply</button>
                </div>
            </div>
        `;

        timelineFeed.appendChild(postCard);
    });
}

// 5. Function: Handle Toggling Likes
window.toggleLike = function(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (post.hasLiked) {
            post.likes--;
            post.hasLiked = false;
        } else {
            post.likes++;
            post.hasLiked = true;
        }
        renderTimeline(); // Re-render feed to show updated count instantly
    }
};

// 6. Function: Handle Adding Comments
window.addComment = function(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            author: "Joshua Izuchukwu",
            content: commentText
        });
        renderTimeline(); // Refresh feed to display the new comment
    }
};

// Initial setup invocation to draw default mock posts on load
renderTimeline();