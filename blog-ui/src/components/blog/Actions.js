import {Button} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import {getUser} from "../../api/userApi";
import {useTranslation} from "react-i18next";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
        },
    },
}));

export default (props) => {
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser().then(({data}) => setUser(data));
    }, [])

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        props.handleEditComment ?
            props.handleEditComment(props.blogId, props.comment)
            :
            props.handleEditBlog(props.blog);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        props.handleDeleteComment ?
            props.handleDeleteComment(props.id)
            :
            props.handleDeleteBlog(props.blog);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                className="comment-actions-icon"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            ><MoreVertIcon/>
            </Button>
            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {(props.handleEditBlog || props.isAuthor) &&
                    <MenuItem onClick={handleEdit} disableRipple>
                        <EditIcon/>
                        {t("Edit")}
                    </MenuItem>
                }
                {
                    (props.isAuthor
                        || user.username
                        && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0])
                    &&
                    <MenuItem onClick={handleDelete} disableRipple>
                        <DeleteForeverIcon/>
                        {t("Delete")}
                    </MenuItem>
                }
            </StyledMenu>
        </div>
    )
}