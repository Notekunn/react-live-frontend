import React from "react";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(2),
        borderRadius: 5
    },
    fonts: {
        fontWeight: "bold"
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    text: {
        paddingLeft: theme.spacing(2)
    },
    avatar: {}
}));
export default function Comment({ from: { name, id: _uid }, message, id }) {
    const classes = useStyles();
    const urlAvatar = `https://graph.facebook.com/${_uid}/picture?type=large`;
    return (
        <ListItem key={id} className={classes.root}>
            <ListItemAvatar className={classes.avatar}>
                <Avatar src={urlAvatar} className={classes.large} />
            </ListItemAvatar>
            <ListItemText
                className={classes.text}
                primary={<Typography className={classes.fonts}>{name}</Typography>}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {message}
                    </Typography>
                }
            />
        </ListItem>
    );
}
