import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Typography, Button, Spin } from 'antd';
import '../AnnouncementSlider.css';

const AnnouncementSlider = ({ maxItems = 3, autoPlay = true, transparentMode = false }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/api/announcements/latest/');
        setAnnouncements(response.data.slice(0, maxItems));
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, [maxItems]);

  return (
    <Spin spinning={loading}>
      <Carousel 
        autoplay={autoPlay}
        dots={{ className: `announcement-slider-dots ${transparentMode ? 'transparent-dots' : ''}` }}
        effect="fade"
        className={`announcement-carousel ${transparentMode ? 'transparent-mode' : ''}`}
      >
        {announcements.map(announcement => (
          <div key={announcement.id} className="announcement-slide">
            <Typography.Text strong className="slide-title">
              {announcement.title}
            </Typography.Text>
            <Typography.Paragraph 
              ellipsis={{ rows: 2 }} 
              className="slide-content"
            >
              {announcement.content}
            </Typography.Paragraph>
            <div className="slide-footer">
              <Typography.Text type="secondary" className="slide-date">
                {new Date(announcement.created_at).toLocaleDateString()}
              </Typography.Text>
              <Button type="text" size="small" className="details-btn">
                ›
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
    </Spin>
  );
};

export default AnnouncementSlider;