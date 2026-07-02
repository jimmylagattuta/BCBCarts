class ContactClickMailer < ApplicationMailer
  default from: "jimmy.lagattuta@gmail.com"

  def contact_click(click_details)
    @click_details = click_details || {}

    contact_type = @click_details["contact_type"].to_s.presence || "contact"
    label = @click_details["label"].to_s.presence || "BCB Carts contact link"

    mail(
      to: "jimmy.lagattuta@gmail.com",
      subject: "BCB Carts #{contact_type.titleize} Click: #{label}"
    )
  end
end