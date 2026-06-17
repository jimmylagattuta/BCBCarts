require "test_helper"

class TuroClickMailerTest < ActionMailer::TestCase
  test "turo_click_email" do
    mail = TuroClickMailer.turo_click_email
    assert_equal "Turo click email", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
