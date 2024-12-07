import React, { useState, useEffect } from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";
import { api } from "@/utils/api";
import { useMember } from "@/context/MemberContext";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import classNames from "classnames";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const StakePage = () => {
  const { member } = useMember();

  const [stakeList, setStakeList] = useState([]);

  const fetchStakeList = async () => {
    try {
      const payload = {
        member_id: member?.member_id,
      };
      const response = await api.post("/api/member/lotto/stake/list", payload);
      console.log("response ==>", response.data.lottos[0]);
      setStakeList(response.data.lottos);
    } catch (error: any) {
      console.log("Error ==>", error?.message);
    }
  };

  useEffect(() => {
    if (member) {
      fetchStakeList();
    }
  }, [member]);

  const generateTotal = (_member_lotto_list: any) => {
    let total = 0;
    _member_lotto_list.forEach((item: any) => {
      total += item.bet_amount;
    });
    return total;
  };

  const generateResult = (_member_lotto_list: any) => {
    let total = 0;
    _member_lotto_list.forEach((item: any) => {
      total += item.bet_pay_result;
    });
    return total;
  };

  return (
    <MemberLayout title="โพยหวย">
      <div className="container px-2">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6">
            <div className="w-full bg-primary px-2 rounded-bl-sm rounded-br-sm pb-2 rounded-sm pt-1">
              <span className="text-white text-sm">
                <i className="bi bi-calendar3 mr-2"></i>โพยหวย
              </span>
            </div>
          </div>
          <div className="col-span-6">
            <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2 rounded-sm pt-1">
              <span className="text-primary text-sm">
                <i className="bi bi-clock mr-2"></i>โพยหวยย้อนหลัง
              </span>
            </div>
          </div>
        </div>
        {stakeList.length > 0 &&
          stakeList.map((stake: any, index) => (
            <Link href={`/member/stake/${stake.member_lotto_id}`} key={index}>
              <div className="w-full">
                <div className={classNames("w-full h-9 mt-2 rounded-tl-sm rounded-tr-sm px-2 pt-1", generateResult(stake.member_lotto_list) <= 0 ? "bg-red-100" : "bg-green-100")}>
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-6">
                      <span className="text-gray-500 text-xs -mt-[10px] mr-1"># เลขที่รายการ</span>
                      <span className={classNames("text-xs", generateResult(stake.member_lotto_list) <= 0 ? "text-red-500" : "text-green-500")}>{stake.member_lotto_id}</span>
                    </div>
                    <div className="col-span-6">
                      <div className="text-right">{generateResult(stake.member_lotto_list) <= 0 ? <span className="border border-red-500 text-xs px-1 rounded-lg font-bold text-red-500">ไม่ถูกรางวัล</span> : <span className="border border-green-500 text-xs px-1 rounded-lg font-bold text-green-500">ถูกรางวัล</span>}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2">
                  <div className="grid grid-cols-12 gap-0 py-2">
                    <div className="col-span-6">
                      <div className="w-full h-10 border-r">
                        <h4 className="text-primary">{stake.lotto.lotto_type.lotto_type_name}</h4>
                        <p className="text-xs text-gray-500">{dayjs(stake.lotto.period).format("DD MMMM BBBB")}</p>
                      </div>
                    </div>
                    <div className="col-span-6 px-2">
                      <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-6">
                          <p className="text-sm text-gray-500 mt-1">เดิมพัน</p>
                        </div>
                        <div className="col-span-6 text-right">
                          <p className="text-primary">{generateTotal(stake.member_lotto_list)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-6">
                          <p className="text-sm text-gray-500 mt-1">ผลได้เสีย</p>
                        </div>
                        <div className="col-span-6 text-right">
                          <p className="text-primary">{generateResult(stake.member_lotto_list)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(StakePage);
