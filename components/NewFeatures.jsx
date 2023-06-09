import Link from "next/link";
import styles from "../styles";

const NewFeatures = ({ imgUrl, title, url }) => (
  <div className="flex-1 m-auto justify-center hover:font-bold hover:scale-110 transition duration-200 ease-in-out cursor-pointer text-center flex flex-col sm:max-w-[250px] min-w-[100px]">
    <Link href={url} target="_blank">
      <div
        className={`${styles.flexCenter} w-[70px] m-auto h-[70px] rounded-[24px] bg-[#323F5D]`}
      >
        <img src={imgUrl} alt="icon" className="w-1/2 h-1/2 object-contain" />
      </div>

      <span className="flex-1 mt-[16px] text-white hover:font-bold  font-normal text-[18px] leading-[32.4px]">
        {title}
      </span>
    </Link>
  </div>
);

export default NewFeatures;
