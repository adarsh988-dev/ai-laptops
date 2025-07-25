import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";

const getYouTubeID = (url) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const VideoSection = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const videos = [
    {
      id: 1,
      title: "The Most Beautiful Laptop I've Ever Seen!",
      videoUrl: "https://www.youtube.com/watch?v=eIYlaVPdNYM",
      channel: "Tech Review",
    },
    {
      id: 2,
      title: "MY FIRST GAMING LAPTOP",
      videoUrl: "https://www.youtube.com/watch?v=QXS2ULann0A&t=9s",
      channel: "Gaming Setup",
    },
    {
      id: 3,
      title: "Why You Shouldn't Buy This Laptop!",
      videoUrl: "https://www.youtube.com/watch?v=XHOmBV4js_E&t=15s",
      channel: "Tech Channel",
    },
    {
      id: 4,
      title: "Gaming Beast Review",
      videoUrl: "https://www.youtube.com/watch?v=XHOmBV4js_E",
      channel: "Review Channel",
    },
  ];

  return (
    <section className="py-4 bg-light">
      <Container>
        <Row className="g-4">
          {videos.map((video) => {
            const videoId = getYouTubeID(video.videoUrl);
            const isPlaying = playingVideoId === video.id;

            return (
              <Col key={video.id} sm={6} lg={3}>
                <div className="video-thumbnail position-relative">
                  {isPlaying ? (
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div
                      style={{ cursor: "pointer", position: "relative" }}
                      onClick={() => setPlayingVideoId(video.id)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={video.title}
                        className="img-fluid w-100"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: "rgba(0,0,0,0.4)" }}
                      >
                        <button className="play-button btn btn-light rounded-circle">
                          <FaPlay />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <h6 className="line-clamp-2 mb-1">{video.title}</h6>
                  <p className="text-muted small mb-0">{video.channel}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default VideoSection;
