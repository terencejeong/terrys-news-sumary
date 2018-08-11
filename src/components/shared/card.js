import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: '5px'
  },
  media: {
    height: 20,
    paddingTop: '56.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { article, classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={article.urlToImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {article.title}
          </Typography>
          <Typography component="p">
            {article.description}
          </Typography>
          <Typography component="p">
            By <b>{article.author}</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href={article.url}
            target="_blank"
          >
            Go to Article
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default withStyles(styles)(SimpleMediaCard);