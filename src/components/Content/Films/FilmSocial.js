const Social = (socialMedia) => {
  if (socialMedia) {
    return (
      <List compact borderless horizontal>
        <List.Item name="homepage" href={details.homepage}>
          <Icon name="linkify" circular />
        </List.Item>

        <List.Item
          name="facebook"
          href={`http://facebook.com/${socialMedia.facebook_id}`}
        >
          <Icon name="facebook" circular />
        </List.Item>

        <List.Item
          name="instagram"
          href={`http://instagram.com/${socialMedia.instagram_id}`}
        >
          <Icon name="instagram" circular />
        </List.Item>

        <List.Item
          name="twitter"
          href={`http://twitter.com/${socialMedia.twitter_id}`}
        >
          <Icon name="twitter" circular />
        </List.Item>
      </List>
    );
  }
};

export default Social;