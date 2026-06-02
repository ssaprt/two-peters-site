import { createPortal } from "react-dom";
import styles from "./PreviewerImg.module.css";
import { TematicalColorButton } from "@/components/button/TematicalColorButton/TematicalColorButton";
import { CloseOutlined } from "@ant-design/icons";

interface PreviewerImgProps {
  backClick: () => void;
  src: string;
}

export const PreviewerImg = ({ backClick, src }: PreviewerImgProps) => {
  return createPortal(
    <div className={styles.previewer}>
      <div className={styles.bodyImg} onClick={() => backClick()}>
        <img src={src} alt="" />
      </div>
      <TematicalColorButton onClick={() => backClick()} icon={<CloseOutlined />}></TematicalColorButton>
    </div>,
    document.body,
  );
};
