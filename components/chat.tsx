"use client";
import { contactInfo, siteInfo } from "@/data/site-content";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

export const Chat = () => {
  const whatsapp = contactInfo.whatsapp;
  return (
    <WhatsAppWidget
      phoneNumber={whatsapp.number}
      companyName={siteInfo.siteName + " Destek"}
      //   replyTimeText="En kısa zamanda size geri dönüş yapıcağız."
      replyTimeText=""
      message={whatsapp.defaultMessage}
      sendButtonText={"Gönder"}
      inputPlaceHolder="Mesajınızı yazın"
    />
  );
};
