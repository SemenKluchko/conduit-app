import React from 'react';
import {Article, ArticlesData} from "api/types/article";
import LoadingOverlay from "components/loading-overlay/LoadingOverlay";
import { Feed } from "./Feed";


interface Props {
    isGlobal?: boolean;
    isLoading?: boolean;
    data?: ArticlesData<Article[]>;
}

const FeedList: React.FC<Props> = ({ isGlobal, data, isLoading  }) => {

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            {data?.articles?.length ? (
                    data.articles.map((article) => (
                        <Feed isGlobal={isGlobal} key={article.slug} article={article} />
                    ))
            ) : (
                <div>No articles yet.</div>
            )}
        </>
    );
};

export default FeedList;
