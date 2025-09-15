// src/app/utils/searchIndex.js
export const SEARCH_INDEX = [
    // Top-level pages
    { path: "/", hash: "#work", aliases: ["work", "our work", "portfolio", "projects"] },
    { path: "/contact", aliases: ["contact", "contact us", "email", "message"] },
    { path: "/gallery", aliases: ["gallery", "photos", "images", "studio pics"] },
    { path: "/equipment", aliases: ["equipment", "equipments", "gear"] },
  
    // Gallery sections
    { path: "/gallery", hash: "#studio-space", aliases: ["studio space", "studio", "space"] },
    { path: "/gallery", hash: "#behind-the-sessions", aliases: ["behind the sessions", "behind the session", "behind the scenes", "bts"] },
  
    // Equipment sections
    { path: "/equipment", hash: "#daws", aliases: ["daws", "logic", "pro tools", "avid", "apple logic pro x"] },
    { path: "/equipment", hash: "#microphones", aliases: ["microphones", "mics", "mic", "u87", "sm7b", "sm58", "sm57", "km184", "c414"] },
    { path: "/equipment", hash: "#interfaces", aliases: ["interfaces", "apollo x8", "uad", "interface"] },
    { path: "/equipment", hash: "#monitors", aliases: ["monitors", "speakers", "kh310", "studio monitors"] },
    { path: "/equipment", hash: "#plugins", aliases: ["plugins", "vsts", "waves", "izotope", "arturia", "kontakt", "komplete", "spitfire", "native instruments", "soundtoys", "neural dsp", "fabfilter", "valhalla", "antares", "ample sound", "swar systems", "roli"] },
  
    // Studio Services pages
    { path: "/studio-services/recording", aliases: ["recording", "guitar recording", "vocal recording", "dubbing", "voice over", "podcast recording", "location sound"] },
    { path: "/studio-services/music-production", aliases: ["music production", "original songs", "jingles", "brand tunes", "short film music", "web series music", "advertisement music", "feature film music"] },
    { path: "/studio-services/sound-design", aliases: ["sound design", "mixing", "films fx", "ads fx", "podcasts fx", "song arrangement fx"] },
    { path: "/studio-services/mastering", aliases: ["mastering", "song mastering", "podcast mastering", "advertisement mastering", "film mastering"] },
    { path: "/studio-services/creative-content", aliases: ["creative content", "lyrics writing", "script writing", "voice-over content"] },
  
    // Deep sections (optional but handy)
    // Recording
    { path: "/studio-services/recording", hash: "#guitar-recording", aliases: ["guitar recording"] },
    { path: "/studio-services/recording", hash: "#vocal-recording", aliases: ["vocal recording", "vocals"] },
    { path: "/studio-services/recording", hash: "#dubbing-voice-overs", aliases: ["dubbing", "voice overs", "voice-over"] },
    { path: "/studio-services/recording", hash: "#podcast-recording", aliases: ["podcast recording"] },
    { path: "/studio-services/recording", hash: "#location-sound-recording", aliases: ["location sound", "on set", "foley"] },
  
    // Music Production
    { path: "/studio-services/music-production", hash: "#original-songs", aliases: ["original songs"] },
    { path: "/studio-services/music-production", hash: "#jingles-brand-tunes", aliases: ["jingles", "brand tunes"] },
    { path: "/studio-services/music-production", hash: "#short-film-music", aliases: ["short film music"] },
    { path: "/studio-services/music-production", hash: "#web-series-music", aliases: ["web series music"] },
    { path: "/studio-services/music-production", hash: "#advertisement-music", aliases: ["advertisement music", "ads music"] },
    { path: "/studio-services/music-production", hash: "#feature-film-music", aliases: ["feature film music"] },
  
    // Sound Design
    { path: "/studio-services/sound-design", hash: "#advertisements", aliases: ["advertisements fx", "ads fx"] },
    { path: "/studio-services/sound-design", hash: "#films", aliases: ["films fx"] },
    { path: "/studio-services/sound-design", hash: "#song-arrangement-fx", aliases: ["song arrangement fx"] },
    { path: "/studio-services/sound-design", hash: "#podcasts", aliases: ["podcasts fx"] },
    { path: "/studio-services/sound-design", hash: "#mixing", aliases: ["mixing"] },
  
    // Mastering
    { path: "/studio-services/mastering", hash: "#songs", aliases: ["song mastering", "songs"] },
    { path: "/studio-services/mastering", hash: "#podcasts", aliases: ["podcast mastering", "podcasts"] },
    { path: "/studio-services/mastering", hash: "#advertisements", aliases: ["advertisement mastering", "ads mastering"] },
    { path: "/studio-services/mastering", hash: "#films", aliases: ["film mastering", "films"] },
  
    // Creative Content
    { path: "/studio-services/creative-content", hash: "#lyrics-writing", aliases: ["lyrics writing", "lyrics"] },
    { path: "/studio-services/creative-content", hash: "#script-writing", aliases: ["script writing", "scripts"] },
    { path: "/studio-services/creative-content", hash: "#voice-over-content", aliases: ["voice-over content", "vo content"] },
  ];
  