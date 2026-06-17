class TuroClickMailer < ApplicationMailer
  default from: ENV.fetch("SMTP_USERNAME", "no-reply@bcbcarts.com")

  def turo_click_email(click_details)
    @click_details = click_details

    vehicle_name = @click_details["vehicle_name"].presence || "Unknown Vehicle"

    mail(
      to: ENV.fetch("TURO_CLICK_NOTIFICATION_EMAIL", "jimmy.lagattuta@gmail.com"),
      subject: "BCB Carts Turo Click: #{vehicle_name}"
    )
  end
end