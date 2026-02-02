// Rich data for the forum

const DATA_VERSION = '1.1'; // Increment to force update

const richUsers = [
    {
        id: 1,
        username: 'AlexTechMaster',
        email: 'alex@techhub.com',
        bio: 'Senior Full Stack Developer & Open Source Enthusiast.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'admin',
        qualifications: 'M.S. Computer Science, Google Cloud Architect'
    },
    {
        id: 2,
        username: 'SarahCreative',
        email: 'sarah@design.co',
        bio: 'UI/UX Designer | Digital Artist | Traveler',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'user',
        qualifications: 'BFA Design, Adobe Certified Expert'
    },
    {
        id: 3,
        username: 'GamerPro99',
        email: 'gaming@play.net',
        bio: 'Hardcore gamer and streamer. Reviews and walkthroughs.',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'user',
        qualifications: 'Pro Gamer, Content Creator'
    },
    {
        id: 4,
        username: 'NatureLover',
        email: 'eco@green.org',
        bio: 'Environmentalist and Photographer.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'user',
        qualifications: 'Environmental Science Major'
    }
];

const richTopics = [
    {
        id: 1,
        title: 'The Future of Artificial Intelligence',
        content: 'AI is evolving rapidly. From generative art to coding assistants like Gemini and Copilot, the landscape is shifting. How do you see AI impacting your daily workflow in the next 5 years? Are we ready for the ethical implications?',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=100',
        author: 1,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        likes: 124,
        comments: [
            {
                id: 101,
                content: 'I think it will automate the boring stuff, leaving us to be more creative!',
                author: 2,
                createdAt: new Date(Date.now() - 80000000).toISOString(),
                likes: 45
            },
            {
                id: 102,
                content: 'A bit scary but also exciting. The productivity boost is undeniable.',
                author: 3,
                createdAt: new Date(Date.now() - 75000000).toISOString(),
                likes: 22
            }
        ]
    },
    {
        id: 2,
        title: 'Top 10 Hidden Gem Travel Destinations 2024',
        content: 'Forget Paris and Tokyo. Let\'s discuss the places that aren\'t overrun by tourists yet. I recently visited a small village in the Alps that was breathtaking. Share your secret spots!',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=100',
        author: 2,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        likes: 89,
        comments: [
            {
                id: 201,
                content: 'I highly recommend exploring the Azores. Absolutely stunning landscapes.',
                author: 4,
                createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                likes: 15
            }
        ]
    },
    {
        id: 3,
        title: 'Cyberpunk 2077: Is it finally fixed?',
        content: 'With the latest Phantom Liberty update, is the game finally what was promised? I\'ve been holding off on playing it. The graphics look insane now with path tracing.',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=100',
        author: 3,
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        likes: 256,
        comments: [
            {
                id: 301,
                content: 'It is a masterpiece now. Totally worth a playthrough.',
                author: 1,
                createdAt: new Date(Date.now() - 1800000).toISOString(),
                likes: 67
            },
            {
                id: 302,
                content: 'The story is one of the best I have ever experienced.',
                author: 2,
                createdAt: new Date(Date.now() - 900000).toISOString(),
                likes: 34
            }
        ]
    },
    {
        id: 4,
        title: 'Minimalist Photography: Less is More',
        content: 'Sharing some of my recent minimalist shots. The key is negative space and composition. What do you guys think constitutes a perfect minimalist photo?',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=100',
        author: 4,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        likes: 142,
        comments: []
    },
    {
        id: 5,
        title: 'Best Mechanical Keyboards for Coding',
        content: 'Blue, Brown, or Red switches? I am currently using a custom build with Holy Panda switches. The "thock" sound is addictive!',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=100',
        author: 1,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        likes: 76,
        comments: [
            {
                id: 501,
                content: 'Browns are the best middle ground for typing and gaming.',
                author: 3,
                createdAt: new Date(Date.now() - 40000000).toISOString(),
                likes: 12
            }
        ]
    }
];

// Initialize localStorage with dummy data if not present or if version changed
const storedVersion = localStorage.getItem('dataVersion');

if (storedVersion !== DATA_VERSION) {
    localStorage.setItem('users', JSON.stringify(richUsers));
    localStorage.setItem('topics', JSON.stringify(richTopics));
    localStorage.setItem('dataVersion', DATA_VERSION);
    // Reset current user if their ID no longer exists or just for safety
    localStorage.setItem('currentUser', null);
    console.log('Data updated to version ' + DATA_VERSION);
} else {
    // Basic checks just in case
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(richUsers));
    }
    if (!localStorage.getItem('topics')) {
        localStorage.setItem('topics', JSON.stringify(richTopics));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', null);
    }
}