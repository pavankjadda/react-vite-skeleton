import {Link} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import {Link as RouterLink, useLocation, matchPath} from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useGetBooksQuery} from '../../../state/api/bookApi';

export default function BreadCrumbs(): JSX.Element {
    const {data: booksSlim} = useGetBooksQuery();
    const {pathname} = useLocation();
    const homeMatches = matchPath("/", "") || matchPath("/home", "");
    const faqMatches = matchPath("/", "faq")
    const profileMatches = matchPath("/", "profile")
    const protocolMatches = matchPath("/protocol", "")
    const protocolAllMatches = matchPath("/protocol", "all")
    const protocolViewMatches = matchPath("/protocol", ":protocolId")
    const protocolDocumentsMatches = matchPath("/protocol", ":protocolId/documents")
    const protocolManagerMatches = matchPath("/protocol", ":protocolId/manage")
    return (<div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}>
                {homeMatches && (<Link underline="hover" color="inherit" component={RouterLink} to="/">
                        Home
                    </Link>)}
                {faqMatches && (<Link underline="hover" color="inherit" component={RouterLink} to="/faq">
                        Faq
                    </Link>)}
                {profileMatches && (<Link underline="hover" color="inherit" component={RouterLink} to="/profile">
                        Profile
                    </Link>)}
                {protocolMatches && (<Link underline="hover" color="inherit" component={RouterLink} to="/protocol">
                        Protocol
                    </Link>)}
                {protocolAllMatches && (
                    <Link underline="hover" color="inherit" component={RouterLink} to="/protocol/all">
                        All
                    </Link>)}
                {protocolViewMatches && (<Link underline="hover" color="inherit" component={RouterLink}
                                               to={`/protocol/${protocolViewMatches.params.protocolId}`}>
                        {booksSlim?.find(protocol => protocol.id.toString() === protocolViewMatches.params.protocolId)?.title}
                    </Link>)}
                {protocolDocumentsMatches && (<Link underline="hover" color="inherit" component={RouterLink}
                                                    to={`/protocol/${protocolDocumentsMatches.params.protocolId}/documents`}>
                        Documents
                    </Link>)}
                {protocolManagerMatches && (<Link underline="hover" color="inherit" component={RouterLink}
                                                  to={`/protocol/${protocolManagerMatches.params.protocolId}/manage`}>
                        Manage
                    </Link>)}
            </Breadcrumbs>
        </div>);
}
