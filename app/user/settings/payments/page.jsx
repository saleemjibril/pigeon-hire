import Image from "next/image";

export default function Payments(params) {
 return (
    <div className="payment">
        <div className="payment__card1">
            <div className="payment__card1__title">
            Payment Details
            </div>
            <div className="payment__card1__subtitle">
            We charge you NGN45,480.00 yearly. Your next billing date is on September 12, 2025. Click the download icon to download a payment receipt.
            </div>
            <div className="payment__card1__amount">
                <div>NGN45,480.00 </div>
                 <Image
                        alt=""
                        width={67}
                        height={24}
                        src={"/assets/icons/premier.svg"}
                      />
                </div>

                <div className="payment__card1__divider"></div>
                <div className="payment__card1__cancel">Cancel subscription</div>
        </div>

        <div className="payment__history">
        <div className="payment__history__title">
        Payment history
            </div>
            <table className="manage-network-table__label">
          <thead className="bg-[#FFF]">
            <tr className="">
              <th>AMOUNT</th>
              <th>PAYMENT STATUS</th>
              <th>DUE DATE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           

            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>NGN240,000.00</td>
              <td>
              <Image
                  src={"/assets/icons/paymentSuccessful.svg"}
                  width={188}
                  height={28}
                  alt=""
                />
              </td>
              <td>Jan 02, 2025 AM</td>
              <td>
              <Image
                  src={"/assets/icons/download.svg"}
                  width={32}
                  height={32}
                  alt=""
                />
              </td>
            </tr>

          
          </tbody>
        </table>

        </div>
    </div>
 )   
}