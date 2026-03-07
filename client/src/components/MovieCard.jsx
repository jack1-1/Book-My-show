import React from "react";
import { Card, Rate, Tag } from "antd";

const { Meta } = Card;

function MovieCard({
    poster,
    title,
    rating,
    genre,
    language
}) {
    return (
        <Card
            hoverable
            style={{ width: 240, borderRadius: "12px" }}
            cover={
                <img
                    alt={title}
                    src={poster}
                    style={{ height: "320px", objectFit: "cover" }}
                />
            }
        >
            <Meta
                title={<h3 style={{ marginBottom: "6px" }}>{title}</h3>}
                description={
                    <>
                        <div style={{ marginBottom: "8px" }}>
                            {/* <Rate disabled allowHalf defaultValue={rating} /> */}
                            <span style={{ marginLeft: "8px" }}>{rating}/10</span>
                        </div>
                        <Tag color="blue">
                            {genre}
                        </Tag>
                        <Tag color="purple">{language}</Tag>
                    </>
                }
            />
        </Card>
    );
}

export default MovieCard;