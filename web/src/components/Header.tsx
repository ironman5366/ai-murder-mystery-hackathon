import React from "react";
import {Group, Image, Title} from "@mantine/core";
import Logo from "../assets/logo.png"

export default function Header() {
    return <>
        <Group>
            <Image src={Logo} style={{
                width: 100,
                height: 100
            }}/>
            <Title>
                Clue-Bot
            </Title>
        </Group>
    </>
}
