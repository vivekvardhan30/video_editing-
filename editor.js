// JavaScript to dynamically update editor details based on URL parameter
const urlParams = new URLSearchParams(window.location.search);
const editorId = urlParams.get('editor');

const editorDetails = {
    1: {
        name: 'John Doe',
        title: 'Video Editing Specialist',
        description: 'John is a skilled video editor with over 5 years of experience in the field. He specializes in creating compelling video content.',
        image: 'editor1.jpg',
        rating: '★★★★☆'
    },
    2: {
        name: 'Jane Smith',
        title: 'Animation Expert',
        description: 'Jane is a top-tier animator with a passion for creating stunning animations that bring stories to life.',
        image: 'editor2.jpg',
        rating: '★★★★★'
    },
    3: {
        name: 'Mike Johnson',
        title: 'Audio Editing Professional',
        description: 'Mike excels in the art of sound editing, working to provide the perfect audio complement to any project.',
        image: 'editor3.jpg',
        rating: '★★★☆☆'
    },
    4: {
        name: 'Emily Davis',
        title: 'Motion Graphics Artist',
        description: 'Emily is an expert in motion graphics and visual effects, with a talent for bringing dynamic visuals to digital platforms.',
        image: 'editor4.jpg',
        rating: '★★★★☆'
    }
};

if (editorId && editorDetails[editorId]) {
    const editor = editorDetails[editorId];
    document.getElementById('editor-name').textContent = editor.name;
    document.getElementById('editor-title').textContent = editor.title;
    document.getElementById('editor-description').textContent = editor.description;
    document.getElementById('editor-image').src = editor.image;
    document.getElementById('editor-rating').textContent = editor.rating;
}